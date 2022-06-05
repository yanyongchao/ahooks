import { useMemo, useEffect } from 'react';
import { useLatest } from '../useLatest';
import { useUpdate } from '../useUpdate';
import { useUnmount } from '../useUnmount';
import { useMemoizedFn } from '../useMemoizedFn';
import { Service, Options, Result } from './type';
import Fetch from './fetch';

function useRequest<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
) {
  // 使用useLatest包装一下service,实际就是一个ref
  // 作用是无论传入的service方法实例是否变化,取到的都是ref值，而ref的好处就是不会重新触发渲染
  const serviceRef = useLatest(service);

  // 因为这里没有用到任何useState，所以状态的改变并不会触发组件的重新渲染
  // useUpdate可以理解为触发强制刷新的方法，当fetchInstance当中的状态改变时调用它，可以做到组件的重渲染
  const update = useUpdate();

  // useCreation可以理解为useMemo,目的是创建一个不变的实例
  const fetchInstance = useMemo(() => {
    return new Fetch<TData, TParams>(serviceRef, options, update);
  }, []);

  useEffect(() => {
    // 在hook（组件）挂载时，如果options没有设置手动触发请求（manual），那么就自动触发请求
    if (!options.manual) {
      const params = options.defaultParams || [];
      // @ts-ignore
      fetchInstance.run(...params);
    }
  }, []);

  useUnmount(() => {
    // 当卸载组件时，调用cancel方法，确保进行中的请求都能被正确取消
    fetchInstance.cancel();
  });

  return {
    loading: fetchInstance.state.loading,
    data: fetchInstance.state.data,
    error: fetchInstance.state.error,
    params: fetchInstance.state.params || [],
    cancel: useMemoizedFn(fetchInstance.cancel.bind(fetchInstance)),
    refresh: useMemoizedFn(fetchInstance.refresh.bind(fetchInstance)),
    refreshAsync: useMemoizedFn(fetchInstance.refreshAsync.bind(fetchInstance)),
    // @ts-ignore
    run: useMemoizedFn(fetchInstance.run.bind(fetchInstance)),
    // @ts-ignore
    runAsync: useMemoizedFn(fetchInstance.runAsync.bind(fetchInstance)),
    mutate: useMemoizedFn(fetchInstance.mutate.bind(fetchInstance)),
  } as Result<TData, TParams>;
}

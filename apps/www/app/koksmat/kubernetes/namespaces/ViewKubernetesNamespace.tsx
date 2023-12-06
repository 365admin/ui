"use client";
import React, { useEffect, useState } from 'react';
import { useProcess } from '@/lib/useprocess';
export interface Namespace {
    kind: string
    apiVersion: string
    preferences: Preferences
    clusters: Cluster[]
    users: User[]
    contexts: Context[]
    "current-context": string
  }
  
  export interface Preferences {}
  
  export interface Cluster {
    name: string
    cluster: Cluster2
  }
  
  export interface Cluster2 {
    server: string
    "certificate-authority-data": string
  }
  
  export interface User {
    name: string
    user: User2
  }
  
  export interface User2 {
    "client-certificate-data": string
    "client-key-data": string
    token: string
  }
  
  export interface Context {
    name: string
    context: Context2
  }
  
  export interface Context2 {
    cluster: string
    user: string
    namespace: string
  }
  
export function ViewKubernetesNamespace(props: { onChanged: (namespace: string) => void; }) {

    const { onChanged } = props;
    // kubectl config view --minify -o jsonpath='{..namespace}' -o=json
    const { isLoading, error, data } = useProcess("kubectl", ["config", "view", "--minify", "-o=json"], 20, "echo");
    const [context, setcontext] = useState<Namespace>()
    useEffect(() => {
        if (data){
        const ctx = JSON.parse(data) as Namespace
        onChanged(ctx.contexts[0].context.namespace);
        setcontext(ctx)
    }

    }, [data, onChanged]);

    return (<div>

        {isLoading && <div>Loading...</div>}

        {error && <div className="text-red-700">{error}</div>}
        {context?.contexts[0].context.namespace}
    </div>);
}

"use client"

import React, { use, useEffect, useState } from "react"
import { set } from "date-fns"

import { useProcess } from "@/lib/useprocess"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/registry/new-york/ui/badge"
import { Button } from "@/registry/new-york/ui/button"

import { PopUp } from "../../tenants/[tenant]/site/[site]/components/popup"
import PodDetails from "./poddetails"

export interface Root {
  apiVersion: string
  items: Item[]
  kind: string
  metadata: Metadata2
}

export interface Item {
  apiVersion: string
  kind: string
  metadata: Metadata
  spec: Spec
  status: Status
}

export interface Metadata {
  annotations?: Annotations
  creationTimestamp: string
  generateName: string
  labels: Labels
  name: string
  namespace: string
  ownerReferences: OwnerReference[]
  resourceVersion: string
  uid: string
  finalizers?: string[]
}

export interface Annotations {
  "checksum/config"?: string
  "prometheus.io/path"?: string
  "prometheus.io/port"?: string
  "prometheus.io/scrape"?: string
  "checksum/configuration"?: string
  "checksum/secret"?: string
}

export interface Labels {
  "app.kubernetes.io/instance"?: string
  "app.kubernetes.io/name"?: string
  "pod-template-hash"?: string
  app?: string
  "app.kubernetes.io/component"?: string
  "app.kubernetes.io/managed-by"?: string
  "helm.sh/chart"?: string
  "controller-revision-hash"?: string
  "statefulset.kubernetes.io/pod-name"?: string
  "controller-uid"?: string
  "job-name"?: string
}

export interface OwnerReference {
  apiVersion: string
  blockOwnerDeletion: boolean
  controller: boolean
  kind: string
  name: string
  uid: string
}

export interface Spec {
  containers: Container[]
  dnsPolicy: string
  enableServiceLinks: boolean
  nodeName: string
  preemptionPolicy: string
  priority: number
  restartPolicy: string
  schedulerName: string
  securityContext: SecurityContext2
  serviceAccount: string
  serviceAccountName: string
  terminationGracePeriodSeconds: number
  tolerations: Toleration[]
  volumes: Volume[]
  affinity?: Affinity
  hostAliases?: HostAliase[]
  hostname?: string
  subdomain?: string
  shareProcessNamespace?: boolean
}

export interface Container {
  args?: string[]
  command?: string[]
  env?: Env[]
  image: string
  imagePullPolicy: string
  livenessProbe?: LivenessProbe
  name: string
  ports?: Port[]
  readinessProbe?: ReadinessProbe
  resources: Resources
  securityContext?: SecurityContext
  terminationMessagePath: string
  terminationMessagePolicy: string
  volumeMounts: VolumeMount[]
  lifecycle?: Lifecycle
  startupProbe?: StartupProbe
}

export interface Env {
  name: string
  value?: string
  valueFrom?: ValueFrom
}

export interface ValueFrom {
  secretKeyRef?: SecretKeyRef
  fieldRef?: FieldRef
}

export interface SecretKeyRef {
  key: string
  name: string
  optional?: boolean
}

export interface FieldRef {
  apiVersion: string
  fieldPath: string
}

export interface LivenessProbe {
  failureThreshold: number
  httpGet?: HttpGet
  initialDelaySeconds: number
  periodSeconds: number
  successThreshold: number
  timeoutSeconds: number
  exec?: Exec
}

export interface HttpGet {
  path: string
  port: any
  scheme: string
}

export interface Exec {
  command: string[]
}

export interface Port {
  containerPort: number
  protocol: string
  name?: string
}

export interface ReadinessProbe {
  failureThreshold: number
  httpGet?: HttpGet2
  initialDelaySeconds: number
  periodSeconds: number
  successThreshold: number
  timeoutSeconds: number
  exec?: Exec2
}

export interface HttpGet2 {
  path: string
  port: any
  scheme: string
}

export interface Exec2 {
  command: string[]
}

export interface Resources {
  requests?: Requests
  limits?: Limits
}

export interface Requests {
  cpu?: string
  memory: string
}

export interface Limits {
  cpu: string
  memory: string
}

export interface SecurityContext {
  allowPrivilegeEscalation?: boolean
  privileged?: boolean
  runAsNonRoot?: boolean
  runAsUser?: number
}

export interface VolumeMount {
  mountPath: string
  name: string
  readOnly?: boolean
  subPath?: string
}

export interface Lifecycle {
  preStop: PreStop
}

export interface PreStop {
  exec: Exec3
}

export interface Exec3 {
  command: string[]
}

export interface StartupProbe {
  failureThreshold: number
  httpGet: HttpGet3
  initialDelaySeconds: number
  periodSeconds: number
  successThreshold: number
  timeoutSeconds: number
}

export interface HttpGet3 {
  path: string
  port: number
  scheme: string
}

export interface SecurityContext2 {
  fsGroup?: number
}

export interface Toleration {
  effect: string
  key: string
  operator: string
  tolerationSeconds?: number
}

export interface Volume {
  name: string
  projected?: Projected
  configMap?: ConfigMap2
  persistentVolumeClaim?: PersistentVolumeClaim
  emptyDir?: EmptyDir
}

export interface Projected {
  defaultMode: number
  sources: Source[]
}

export interface Source {
  serviceAccountToken?: ServiceAccountToken
  configMap?: ConfigMap
  downwardAPI?: DownwardApi
}

export interface ServiceAccountToken {
  expirationSeconds: number
  path: string
}

export interface ConfigMap {
  items: Item2[]
  name: string
}

export interface Item2 {
  key: string
  path: string
}

export interface DownwardApi {
  items: Item3[]
}

export interface Item3 {
  fieldRef: FieldRef2
  path: string
}

export interface FieldRef2 {
  apiVersion: string
  fieldPath: string
}

export interface ConfigMap2 {
  defaultMode: number
  name: string
}

export interface PersistentVolumeClaim {
  claimName: string
}

export interface EmptyDir {}

export interface Affinity {
  podAntiAffinity: PodAntiAffinity
}

export interface PodAntiAffinity {
  preferredDuringSchedulingIgnoredDuringExecution: PreferredDuringSchedulingIgnoredDuringExecution[]
}

export interface PreferredDuringSchedulingIgnoredDuringExecution {
  podAffinityTerm: PodAffinityTerm
  weight: number
}

export interface PodAffinityTerm {
  labelSelector: LabelSelector
  topologyKey: string
}

export interface LabelSelector {
  matchLabels: MatchLabels
}

export interface MatchLabels {
  "app.kubernetes.io/component"?: string
  "app.kubernetes.io/instance": string
  "app.kubernetes.io/name": string
}

export interface HostAliase {
  hostnames: string[]
  ip: string
}

export interface Status {
  conditions: Condition[]
  containerStatuses: ContainerStatuse[]
  hostIP: string
  phase: string
  podIP: string
  podIPs: PodIp[]
  qosClass: string
  startTime: string
}

export interface Condition {
  lastProbeTime: any
  lastTransitionTime: string
  status: string
  type: string
  reason?: string
  message?: string
}

export interface ContainerStatuse {
  containerID: string
  image: string
  imageID: string
  lastState: LastState
  name: string
  ready: boolean
  restartCount: number
  started: boolean
  state: State
}

export interface LastState {
  terminated?: Terminated
}

export interface Terminated {
  containerID: string
  exitCode: number
  finishedAt: string
  reason: string
  startedAt: string
}

export interface State {
  running?: Running
  terminated?: Terminated2
}

export interface Running {
  startedAt: string
}

export interface Terminated2 {
  containerID: string
  exitCode: number
  finishedAt: string
  reason: string
  startedAt: string
}

export interface PodIp {
  ip: string
}

export interface Metadata2 {
  resourceVersion: string
}

interface RunServerProcessProps {
  cmd: string
  args: string[]
  timeout: number
  channelname: string
}

function convert(data: string): Root | null {
  if (!data) return null
  return JSON.parse(data) as Root
}

export default function ListPods() {
  const { isLoading, error, data } = useProcess(
    "kubectl",
    ["get", "pods", "-o", "json"],
    20,
    "echo"
  )
  const [selectedPod, setselectedPod] = useState<Item>()
  const [showDetails, setshowDetails] = useState(false)

  useEffect(() => {
    if (selectedPod) {
    }
  }, [selectedPod])

  if (data) {
    console.log(data)
  }
  return (
    <div>
      {isLoading && <div>Loading...</div>}

      {error && <div className="text-red-700">{error}</div>}
      <div className=" items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 ">
      
        {convert(data)
          ?.items?.filter((item: Item) => item.status.phase !== "Succeeded")
          .map((item: Item) => (
            <Card key={item.metadata.name} >
              <CardHeader>
                <CardTitle className="text-2xl">{item.metadata.name}</CardTitle>
                <CardDescription>
                  <Badge
                    variant={
                      item.status.phase === "Running"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {item.status.phase}
                  </Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <div className=" p-4">
                    {item.spec.containers.map((container) => {
                      return (
                        <div key={container.name}>
                          <div className="font-bold">{container.name} </div>
                          <div>image: {container.image} </div>
                          {container.command && (
                            <div>
                              cmd: {container.command}{" "}
                              {((container.args as string[]) ?? []).map(
                                (arg) => (
                                  <span key={arg}>{arg} </span>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </p>
              </CardContent>
              <CardFooter>
                <p>
                  {" "}
                  <Button
                    onClick={() => {
                      setselectedPod(item)
                      setshowDetails(true)
                    }}
                  >
                    Details
                  </Button>
                </p>
              </CardFooter>
            </Card>
          ))}
      </div>
      <PopUp
        show={showDetails}
        onClose={() => setshowDetails(false)}
        title={selectedPod?.metadata.name ?? "Details"}
        description={""}
      >
        <PodDetails pod={selectedPod} />
      </PopUp>
    </div>
  )
}

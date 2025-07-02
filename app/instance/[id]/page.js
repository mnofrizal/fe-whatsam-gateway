import { InstanceManager } from "@/components/instance-manager"

export default function InstancePage({ params }) {
  return <InstanceManager instanceId={params.id} />
}
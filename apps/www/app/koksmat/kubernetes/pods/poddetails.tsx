

// React component with details of a pod

import { Item } from ".";

export default function PodDetails(props: {pod:Item | undefined}) {
    return (
        <pre>
            {JSON.stringify(props.pod, null, 2)}
        </pre>
    )
}
  
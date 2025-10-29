## Install

```bash
pnpm add echarts
```

## Partial Imports

1. export in `src/utils/echarts.ts`

```ts
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([LineChart, TooltipComponent, CanvasRenderer])
export default echarts
```

2. use in vue components

```vue
<script setup>
import * as echarts from '@/utils/echarts'
</script>
```

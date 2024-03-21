import { Button } from '@shopify/polaris';
import LayoutExample from './components/LayoutExample';

export default function App() {
  return <>
    <h1 className="text-[#e31e1e]">App</h1>
    <Button variant="primary" tone="critical">
      View shipping settings
    </Button>
    <LayoutExample />
  </>
}
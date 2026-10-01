import { useState } from 'react';
import type { CollapsibleSectionProps } from './types';
import {
  InspectorCollapsibleBody,
  InspectorCollapsibleChevron,
  InspectorCollapsibleHeader,
  InspectorCollapsibleSection,
  InspectorSectionTitle,
} from './settings-panel.styles';
export function CollapsibleSection({
  title,
  icon,
  defaultOpen = true,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <InspectorCollapsibleSection>
      <InspectorCollapsibleHeader type="button" onClick={() => setOpen((value) => !value)}>
        <InspectorSectionTitle style={{ margin: 0 }}>
          {icon}
          {title}
        </InspectorSectionTitle>
        <InspectorCollapsibleChevron $open={open}>▾</InspectorCollapsibleChevron>
      </InspectorCollapsibleHeader>
      {open ? <InspectorCollapsibleBody>{children}</InspectorCollapsibleBody> : null}
    </InspectorCollapsibleSection>
  );
}

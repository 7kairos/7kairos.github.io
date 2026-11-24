import React from 'react'
import { PreviewCard } from '@animate-ui/react/primitives/base-ui/preview-card'

export default function LinkPreview({ preview, children, ...linkProps }) {
  return (
    <PreviewCard.Root>
      <PreviewCard.Trigger {...linkProps} delay={120} closeDelay={120}>
        {children}
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner className="link-preview-positioner" side="top" sideOffset={8} collisionPadding={12}>
          <PreviewCard.Popup className="link-preview-popup">{preview}</PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  )
}

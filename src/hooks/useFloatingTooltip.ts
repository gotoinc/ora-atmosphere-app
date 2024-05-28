import type { Ref } from 'vue';
import type { MaybeElement, ReferenceElement } from '@floating-ui/vue';
import { flip, offset, shift, useFloating } from '@floating-ui/vue';

export const useFloatingTooltip = (
    reference: Readonly<Ref<MaybeElement<ReferenceElement>>>,
    tooltip: Readonly<Ref<MaybeElement<HTMLElement>>>
) => {
    const { floatingStyles } = useFloating(reference, tooltip, {
        placement: 'top-start',
        middleware: [
            flip(),
            offset({
                alignmentAxis: -14,
                mainAxis: 12,
            }),
            shift({ padding: 10 }),
        ],
    });

    return { floatingStyles };
};

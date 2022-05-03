export default {
    beforeMount(el, {value}) {
        M.Tooltip.init(el, {html: value})
    },
    unmounted(el){
        const tooltip = M.Tooltip.getInstance(el)

        if(tooltip && tooltip.unmount){
            tooltip.unmount()
        }
    }
}
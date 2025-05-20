import {ref,onBeforeMount} from 'vue';

export const useHorizontalScroll = () => {
    const scrollRef = ref(null);
    const pos = ref({
        left:0,
        x:0,
        isScrolling: false,
    });
    const onMouseDown = (e)=>{
      pos.value.isScrolling = true;
      pos.value.left = scrollRef.value.scrollLeft;
      pos.value.x = e.clientX;
    };
    const onMouseLeave = () => {
        pos.value.isScrolling = false;
    };

    const onMouseUp = () => {
        pos.value.isScrolling = false;
    };

    const onMouseMove = (e) => {
        if(!pos.value.isScrolling) return;
            e.preventDefault();
            const dx=e.clientX - pos.value.x;
            scrollRef.value.scrollLeft = pos.value.left - dx; ;
    };

    onBeforeMount(()=>{
        pos.value.isScrolling = false;
    });

    return {scrollRef,onMouseDown,onMouseUp, onMouseMove, onMouseLeave};
};

export default useHorizontalScroll;
// директива, будем отслеживать пересечения какого-то эл-та
export default {
    mounted(el, binding) {                                                  // экспортируем из этого файла объект, укоторого есть ф-ция "mounted", которая принимает объект "el" (element), а также "binding"
        const options = {
          rootMargin: '0px',
          threshold: 1.0
        }
        const callback = (entries, observer) => {
          if (entries[0].isIntersecting) {
            binding.value()
          }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
    name: 'intersection'
}

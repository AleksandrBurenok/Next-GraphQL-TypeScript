import { useEffect, useState, MutableRefObject, useRef } from 'react';

function useOnScreen(
  ref: MutableRefObject<HTMLDivElement>,
  rootMargin = '0px'
) {
  const isInter = useRef(false);

  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isInter.current && entry.isIntersecting) {
          isInter.current = true;

          setIntersecting(entry.isIntersecting);
        }
      },
      {
        rootMargin,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isInter]);

  return isIntersecting;
}

export default useOnScreen;

// ... imports
import useIsMobile from "../../hooks/useIsMobile";

// ... Blob and Bolt remain same (SVG is cheap) ...

export const CubeShape = () => {
  const isMobile = useIsMobile();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [25, -25]);
  const rotateY = useTransform(mouseX, [-300, 300], [-25, 25]);

  // Mobile: Auto Animation // Desktop: Mouse Interaction
  const mobileAnimate = { rotateX: [25, -25, 25], rotateY: [-25, 25, -25] };
  const mobileTransition = { duration: 10, repeat: Infinity, ease: "linear" };

  return (
    <div
      className="w-[300px] h-[300px] flex items-center justify-center cube-container"
      onMouseMove={!isMobile ? handleMouseMove : undefined} // Disable listener on mobile
    >
      <motion.div
        className="cube"
        style={!isMobile ? { rotateX, rotateY } : {}} // Desktop style
        animate={isMobile ? mobileAnimate : {}} // Mobile animate
        transition={isMobile ? mobileTransition : {}}
      >
        <div className="face front" />
        <div className="face back" />
        <div className="face right" />
        <div className="face left" />
        <div className="face top" />
        <div className="face bottom" />
      </motion.div>
    </div>
  );
};

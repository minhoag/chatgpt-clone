import { useIsMobile } from "@/components/hooks/use-mobile";
import { BrandIcons as Icons } from "@/components/icon/icon";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

export function Introducing() {
  const isMobile = useIsMobile();

  return (
    <div className="relative flex h-[320px] md:h-[450px] w-full flex-col items-center justify-center overflow-hidden bg-background">
      <span className="mb-2 text-sm text-center">Introducing</span>
      <span className="pointer-events-none whitespace-pre-wrap bg-foreground bg-clip-text text-center text-5xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        ChatGPT
      </span>
      <span className="mt-2 text-center text-sm md:text-base md:mt-8">
        Your assistant, your friend.
      </span>

      <OrbitingCircles
        iconSize={isMobile ? 20 : 40}
        radius={isMobile ? 120 : 160}
        speed={2}
      >
        <Icons.bard />
        <Icons.openai />
        <Icons.copilot />
      </OrbitingCircles>
      <OrbitingCircles
        reverse
        iconSize={30}
        radius={isMobile ? 75 : 100}
        speed={3}
      >
        <Icons.gitHub />
        <Icons.github_copilot />
      </OrbitingCircles>
    </div>
  );
}

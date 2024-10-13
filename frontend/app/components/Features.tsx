import AnimationContainer from "@/components/animation-container";
import MagicBadge from "@/components/ui/magic-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import React from "react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "FastForward",
    title: "Quick and Easy",
    description:
      "Taskster is designed to be quick and easy to use, so you can focus on getting things done.",
  },
  {
    icon: "MonitorSmartphone",
    title: "Cross-Platform",
    description: "Taskster works on all your devices, so you can manage your tasks from anywhere.",
  },
  {
    icon: "BicepsFlexed",
    title: "Powerful Features",
    description:
      "Taskster comes with powerful features like tags, due dates, and priority levels to help you stay organized.",
  },
];

const Features = () => {
  return (
    <div>
      <AnimationContainer delay={0.1}>
        <div className="py-28 bg-neutral-950 flex flex-col items-center justify-center text-center text-white">
          <MagicBadge title="Features" />

          <h2 className="text-center lg:text-center text-3xl md:text-5xl leading-[1.1] font-medium font-heading text-foreground mt-6 sm:mt-8 text-white">
            Manage Tasks Like a Pro
          </h2>
          <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-screen-md">
            Taskster is a powerful tasks and project management tool that helps you manage, track,
            and organize all your tasks in one place.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mt-12">
            {featureList.map(({ icon, title, description }) => (
              <AnimationContainer key={title} delay={0.2}>
                <div>
                  <Card className="h-full bg-neutral-950 border-0 shadow-none">
                    <CardHeader className="flex justify-center items-center">
                      <div className="bg-purple-500/30 p-2 rounded-full ring-8 ring-purple-500/20 mb-4">
                        <Icon
                          name={icon as keyof typeof icons}
                          size={24}
                          className="text-purple-500"
                        />
                      </div>

                      <CardTitle className="text-neutral-100">{title}</CardTitle>
                    </CardHeader>

                    <CardContent className="text-muted-foreground text-center">
                      {description}
                    </CardContent>
                  </Card>
                </div>
              </AnimationContainer>
            ))}
          </div>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default Features;

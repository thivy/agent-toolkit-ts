"use client";

import { Heading } from "@/components/ui/heading";

export const HomePage = () => {
  return (
    <div className="mx-auto max-w-2xl h-screen flex flex-col justify-center gap-6">
      <Heading variant="h1" className="">
        Agent Toolkit
      </Heading>
      <p className="text-lg text-muted-foreground">
        Opinionated approach to building production ready line-of-business applications that
        integrate multiple enterprise APIs at speed.
      </p>
    </div>
  );
};

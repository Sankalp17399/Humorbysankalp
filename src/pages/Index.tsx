import { MadeWithDyad } from "@/components/made-with-dyad";
import JokeCard from "@/components/JokeCard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="flex-grow flex items-center justify-center w-full py-12">
        <JokeCard />
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;
import { Loader } from "lucide-react";

interface LoadingProps {
  description: string;
}

export const Loading: React.FC<LoadingProps> = ({
  description
}) => {

  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed mx-4">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">

        <Loader className="animate-spin h-4 w-4 mr-2" />

        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          {description}
        </p>

      </div>
    </div>
  )
}
import { OctagonAlert } from "lucide-react";

interface WarningProps {
  description: string;
}

export const Warning: React.FC<WarningProps> = ({
  description
}) => {

  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed mx-4">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">

        <OctagonAlert className="text-red-400" size={48}/>

        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          {description}
        </p>

      </div>
    </div>
  )
}
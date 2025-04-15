export const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">{children}</div>
  );
  
  export const CardHeader = ({ title }: { title: string }) => (
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
  );
  
  export const CardContent = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  
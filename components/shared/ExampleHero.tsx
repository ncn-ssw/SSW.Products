// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HeroBlock({ data, index }: { data: { title?: string | null }; index: number }) {
    return (
      <div className="text-red-600">{data.title}</div>
    );
  }
  
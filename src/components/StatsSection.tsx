const stats = [
  {
    id: 1,
    value: "5,000+",
    label: "Students",
  },
  {
    id: 2,
    value: "Ranked #1",
    label: "By Parents",
  },
  {
    id: 3,
    value: "98%",
    label: "Satisfaction",
  },
];

const StatsSection = () => {
  return (
    <section className="py-8 md:py-10 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-[66px] md:gap-[82px] lg:gap-[98px]">
          {stats.map((stat, index) => (
            <>
              <div 
                key={stat.id} 
                className="flex flex-col items-center justify-center text-center px-4 md:px-6"
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1 whitespace-nowrap">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
              {index < stats.length - 1 && (
                <div className="h-12 md:h-16 w-px bg-border" />
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

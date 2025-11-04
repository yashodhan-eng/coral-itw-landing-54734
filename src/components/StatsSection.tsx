const stats = [
  {
    id: 1,
    value: "100+ years",
    label: "Teacher experience",
  },
  {
    id: 2,
    value: "Founded by",
    label: "stanford alum and a mom",
  },
  {
    id: 3,
    value: "1000+",
    label: "Families love us",
  },
];

const StatsSection = () => {
  return (
    <section className="py-6 px-2 md:py-8 md:px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-6 md:gap-12 lg:gap-20">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="flex flex-col items-center md:items-start justify-center text-center md:text-left"
            >
              <p className="text-base md:text-xl lg:text-2xl font-semibold text-green-600 mb-0.5 leading-tight whitespace-nowrap">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm lg:text-base text-muted-foreground/80 leading-tight">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

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
    <section className="py-8 px-4 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-12 md:gap-16 lg:gap-20">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="flex flex-col items-start justify-center"
            >
              <p className="text-xl md:text-2xl lg:text-2xl font-semibold text-green-600 mb-0.5 whitespace-nowrap">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground/80 whitespace-nowrap">
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

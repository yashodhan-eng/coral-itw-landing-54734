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
    <section className="py-4 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
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

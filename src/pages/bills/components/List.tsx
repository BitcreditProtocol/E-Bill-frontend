import Bill from "@/components/Bill";

export default function List() {
  return (
    <div className="flex flex-col gap-1.5">
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
      <Bill title="Electricity" amount={100} date="2022-12-31" currency="USD" />
    </div>
  );
}

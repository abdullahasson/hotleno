// Components
import Header from "@/components/flights/Header";
import HotelDetails from "@/components/hotels/HotelDetails";

export default async function Hotel({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {

  const { id } = await params;
  
  return (
    <div>
      <Header />
      <HotelDetails 
        id={id}
      />
    </div>
  )
}
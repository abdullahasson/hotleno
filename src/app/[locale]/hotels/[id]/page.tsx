// Components
import HotelDetails from "@/components/hotels/hotel-details";

export default async function Hotel({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {

  const { id } = await params;
  
  return (
    <div>
      <HotelDetails 
        id={id}
      />
    </div>
  )
}
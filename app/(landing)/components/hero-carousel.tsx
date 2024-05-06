import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import sample_one from "@/public/images/sample_one.jpg";
import sample_two from "@/public/images/sample_two.jpg";
import sample_three from "@/public/images/sample_three.jpg";
import Image from "next/image";
export function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        setApi={setApi}
        className="w-full h-80 rounded-md overflow-hidden bg-gray-800"
      >
        <CarouselContent>
          {[sample_one, sample_two, sample_three].map((image, index) => (
            <CarouselItem key={index} className="">
              <Image
                alt=""
                src={image}
                className=" bg-center bg-cover aspect-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

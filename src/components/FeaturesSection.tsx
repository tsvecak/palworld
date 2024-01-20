'use client';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
const features = [
  {
    name: 'Monster taming',
    description:
      "Palworld is home to over 100 unique Pals, each equipped with a diverse set of skills to enhance the player's adventure.",
  },
  {
    name: 'Action-RPG',
    description:
      'Players wield a range of weapons, from classic bows and spears to modern assault rifles and rocket launchers.',
  },
  {
    name: 'Base building',
    description:
      'Players can enjoy the experience of constructing bases alongside their Pals.',
  },
];

export default function FeaturesSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (inView === true && videoRef?.current) {
      videoRef.current.play();
    }
  });

  return (
    <div className="dark:bg-dark overflow-hidden bg-white py-24 sm:py-32 dark:text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Palworld
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                Features
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
                Palworld seamlessly integrates elements of battle,
                monster-capturing, training, and base building.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none dark:text-white">
                {features.map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt className="inline font-semibold text-gray-900 dark:text-white">
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div
            ref={ref}
            className="background-pattern relative flex items-center"
          >
            <video
              src="/videos/palworld_showcase.mp4"
              ref={videoRef}
              className=" w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10"
              width={500}
              height={400}
              autoPlay={true}
              muted
            />
          </div>
        </div>
      </div>
    </div>
  );
}

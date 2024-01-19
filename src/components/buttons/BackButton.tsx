'use client';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <a
      onClick={() => router.back()}
      className="mb-auto cursor-pointer underline underline-offset-2"
    >
      {`< `}Back to Paldeck
    </a>
  );
};

export default BackButton;

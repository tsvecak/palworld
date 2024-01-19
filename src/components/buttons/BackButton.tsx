'use client';
import { useRouter } from 'next/navigation';

const BackButton = ({ label = 'Back' }) => {
  const router = useRouter();
  return (
    <a
      onClick={() => router.back()}
      className="mb-auto cursor-pointer underline underline-offset-2"
    >
      {`< `}
      {label}
    </a>
  );
};

export default BackButton;

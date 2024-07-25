import { useRouter } from 'next/router';
import SwapComponent from '@/SwapComponent';

export default function Submit() {
  const router = useRouter();
  const { title } = router.query;

  if (!title) {
    return <p>Loading...</p>;
  }

  const address = decodeURIComponent(Array.isArray(title) ? title[0] : title);

  return (
    <SwapComponent address={address} />
  );
}
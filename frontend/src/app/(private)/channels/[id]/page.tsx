import { ChannelPage } from '$/views/ChannelPage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  return <ChannelPage id={(await params).id} />;
}

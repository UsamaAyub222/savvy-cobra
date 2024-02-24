

import { Metadata } from 'next';
import WorkPage from './WorkPage';
import workData from '../workData';


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id
  const filterCategory = workData.filter((obj) => {
    return id === obj.slug;
  });
  const innerContent = filterCategory[0];

  return {
    title: `Savvy Cobra | ${innerContent.SEOTitle}`,
    description: innerContent.SEODesc,
    openGraph: {
      // images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}


export default function Page({ params, searchParams }) {
  return(
    <WorkPage></WorkPage>
  )
}

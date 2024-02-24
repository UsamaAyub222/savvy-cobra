import { Metadata } from 'next';
import WorkDetails from './WorkDetails';
import data from '../../workData';


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const {id, id2} = params
  let filterCategory = data.filter((obj) => {
    return id === obj.slug;
  });
console.log(filterCategory)
  filterCategory = filterCategory[0];
  let object = {};
  let findIn = filterCategory?.content.filter((obj) => {
    if (id2 === obj.slug) {
      object = obj;
      return;
    }
  });

console.log(object)

  return {
    title: `Savvy Cobra | ${object.title}`,
    description: object.desc,
    openGraph: {
      // images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}


export default function Page({ params, searchParams }) {



  return(
    <WorkDetails></WorkDetails>
  )
}

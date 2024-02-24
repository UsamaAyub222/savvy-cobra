import { useParams } from "next/navigation";
import data from'../workData'
import Link from "next/link";

function NextPageLink() {
const { id, id2 } = useParams()
console.log(id)
  const staticRoutes = [undefined, 'about', 'contact'];

  const findNextPage = () => {

    if (staticRoutes.includes(id)) {
      // If on a static route, navigate to the first top-level dynamic route
      const firstTopLevelItem = data[0];
      return {
        link: `/${firstTopLevelItem.slug}`,
        title: firstTopLevelItem.title
      };
    }

    const topLevelIndex = data.findIndex(item => item.slug === id);
    if (topLevelIndex === -1) return null;

    const topLevelItem = data[topLevelIndex];
    
    if (!id2) {
      // If there's no id2, find the next topLevelItem
      const nextTopLevelItem = data[topLevelIndex + 1];
      if (!nextTopLevelItem) return null;
      
      return {
        link: `/${nextTopLevelItem.slug}`,
        title: nextTopLevelItem.title
      };
    } else {
      // If there's a id2, find the next sub-item
      const subItemIndex = topLevelItem.content.findIndex(item => item.slug === id2);
      if (subItemIndex === -1) return null;
      
      const nextSubItem = topLevelItem.content[subItemIndex + 1];
      if (!nextSubItem) {
        // If there's no next sub-item, move to the next topLevelItem
        const nextTopLevelItem = data[topLevelIndex + 1];
        if (!nextTopLevelItem) return null;
        
        return {
          link: `/${nextTopLevelItem.slug}`,
          title: nextTopLevelItem.title
        };
      }
      
      return {
        link: `/${topLevelItem.slug}/${nextSubItem.slug}`,
        title: nextSubItem.title
      };
      
    }
  };

  const nextPage = findNextPage();
  if (!nextPage){
    console.log('No next page found');
    return null;  // or some default content if there's no next page

  } 
  

  return (
    <Link href={nextPage.link}>
      {nextPage.title}
    </Link>
  );
}

export default NextPageLink;
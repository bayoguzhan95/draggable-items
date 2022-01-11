import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home({ users }) {
  const [values, setValues] = useState({ userLists: users });

  const handleDrag = (e, index) => {
    e.dataTransfer.setData('itemIndex', index);
  };

  const handleDrop = async (e, index) => {
    const movingItemIndex = e.dataTransfer.getData('itemIndex');
    const targetItemIndex = index;
    let allUserList = values.userLists;

    let movingItem = allUserList[movingItemIndex]; // clicked/dragged item to re-order
    allUserList.splice(movingItemIndex, 1); // remove 1 item from the given index
    allUserList.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setValues({ ...values, userLists: [...allUserList] });
  };

  return (
    <div className={styles.container}>
      <div onDragOver={(e) => e.preventDefault()}>
        {values?.userLists.map((item, index) => (
          <div key={index} draggable onDragStart={(e) => handleDrag(e, index)} onDrop={(e) => handleDrop(e, index)} className={styles.wrapper}>
            <div className={styles.indexes}>{index + 1}</div>
            <div>
              <h6 className={styles.text}>{item.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
};

import Image from "next/image";
export default function ExploreLoading() {



  return (
    <div style={styles.container}>
      
      
        <Image src="/logonew.png" alt='o' height={15} width={15} className="spinner"></Image>
   
    </div>
  );
}


const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
};

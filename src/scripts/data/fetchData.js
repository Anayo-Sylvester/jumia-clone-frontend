const fetchData = async (dataRef,setLoading,url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        dataRef.current = data;
        console.log(dataRef.current)
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

export default fetchData
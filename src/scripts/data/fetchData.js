const fetchData = async (setDataState,setLoading,url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        setDataState(data);
        console.log(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        setLoading(false);
    }
};

export default fetchData
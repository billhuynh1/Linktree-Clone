import { useEffect, useState } from 'react'
import supabase from '@/utils/supabaseClient'

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log("User", user);
      if (user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    };
    getUser();
  }, [])

  useEffect(() => {
    const getLinks = async () => {
      try {
      const { data, error } = await supabase
        .from("links")
        .select()
        .eq("user_id", userId);

      if (error) throw error;

      console.log("data: ", data);
      } catch (error) {
        console.log("error: ", error)
      }
    };
    if (userId) {
      getLinks();
    }
  }, [userId]);
  
  const addNewLink = async () => {
    try {
      if (title && url && userId){
        const { data, error } = await supabase
        .from("links")
        .insert({
          title: title,
          url: url,
          user_id: userId,
        })
        .select();
        if (error) throw error;
        console.log("data: ", data)
      }
    } catch (error) {
      console.log("error: ", error)
    }
  };

  return (
  <div className='flex flex-col items-center justify-center mt-5'>
    {isAuthenticated && (
       <>
        <div className="mt-1">
          <div className='block text-sm font-medium text-gray-700'>
            Title
          </div>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="My link"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mt-1">
          <div className='block text-sm font-medium text-gray-700'>
            URL
          </div>
          <input
            id="url"
            name="url"
            type="text"
            placeholder="https://google.com"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
    <button 
      type="button"
      className="flex mt-4 mb-4 justify-center rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={addNewLink}
    >
      Add New link
    </button>
    </>
    )}
  </div>
  );
}
 
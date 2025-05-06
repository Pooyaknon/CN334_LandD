'use client'

export default function Login() {
  async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const payload = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    const response = await fetch('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    try {
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('jwt_access', data.access);
        alert("Login success!");
      } else {
        alert("Your username/password are incorrect!");
      }
    } catch (error) {
      alert("ไม่สามารถเชื่อมต่อกับ API ได้");
      console.error(error);
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <div
        style={{ fontSize: "64px" }}
        className="w-full flex flex-col justify-center items-center dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
      >
        <div>CN334 Login form</div>
        <form onSubmit={onLogin} className="flex flex-col gap-1 text-3xl">
          <div>
            <label>Username: </label>
            <input
              name="username"
              className="p-1 rounded-lg text-black"
              type="text"
              placeholder="cn334"
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              name="password"
              className="p-1 rounded-lg text-black"
              type="password"
              placeholder="password"
            />
          </div>
          <button className="p-2 bg-green-400 rounded-xl my-2" type="submit">
            Login
          </button>
        </form>
      </div>
    </main>
  );
}

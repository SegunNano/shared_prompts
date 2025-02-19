import '@/styles/global.css';
import Navbar from '@components/Navbar';
import Provider from '@components/Provider';

const metadata = {
    title: 'PromptHaven',
    description: 'Discover & Share AI prompts'
};

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export { metadata };
export default RootLayout;
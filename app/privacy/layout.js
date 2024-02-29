import ToHomePage from '../components/ToHomePage';

export default function PrivacyLayout({ children }) {
    return (
        <>
            <ToHomePage></ToHomePage>
            {children}
        </>
    )

}
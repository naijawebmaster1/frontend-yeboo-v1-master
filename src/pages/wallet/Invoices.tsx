import WalletHistory from "../../components/base-components/walletTabs/walletHistory"
import Header from "../../components/block-components/header/header"

const Invoices = () => {
    return (
        <main>
            <header>
                <Header />
            </header>

            <section className="mx-auto max-w-7xl flex flex-col gap-y-10 p-6">
                <span className="">
                    <h2 className="text-2xl font-bold text-[#292D32]">Invoices</h2>
                </span>

                <div className="bg-[#FFF] shadow-[0_4px_34px_0_rgba(0,0,0,0.02)] rounded-lg flex justify-between items-center p-4">
                    <span>All Invoice</span>
                    <span />
                </div>

                <div>
                    <WalletHistory />
                </div>
            </section>
        </main>
    )
}
export default Invoices
// tela com kip animado
// import styles from "./login-page.module.scss";

// import { LoginForm } from "@/modules/auth/components/login-form/login-form";

// export default function LoginPage() {
//   return (
//     <main className={styles.container}>
//       {/* ESQUERDA */}
//       <section className={styles.left}>
//         <div className={styles.brand}>

//           {/* LOGO */}
//           <div className={styles.logo}>
//             <div className={styles.logoIcon}>E</div>

//             <div>
//               <h1>ECP</h1>
//               <span>Centro de Custos Pessoal</span>
//             </div>
//           </div>

//           <h2>
//             Gestão <span>inteligente</span>
//             <br />
//             para decisões financeiras melhores.
//           </h2>

//           <p>
//             Organize despesas, acompanhe indicadores, monitore resultados e
//             tome decisões baseadas em dados reais.
//           </p>

//           <div className={styles.features}>
//             <div>
//               <strong>Indicadores em tempo real</strong>
//               <span>Visualize KPIs e métricas instantaneamente.</span>
//             </div>

//             <div>
//               <strong>Controle financeiro completo</strong>
//               <span>Receitas, despesas e patrimônio em um único lugar.</span>
//             </div>

//             <div>
//               <strong>Segurança corporativa</strong>
//               <span>Proteção avançada dos seus dados financeiros.</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* DIREITA */}
//       <section className={styles.right}>
//            {/* KPI CARD */}
//           <div className={styles.kpiCard}>
//             <div className={styles.kpiHeader}>
//               <div>
//                 <span>Resultado Mensal</span>
//                 <strong>R$ 13.640</strong>
//               </div>

//               <div className={styles.kpiBadge}>+12.8%</div>
//             </div>

//             <div className={styles.kpiDescription}>
//               Crescimento em relação ao mês anterior
//             </div>

//             <div className={styles.chart}>
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//               <span />
//             </div>
//           </div>

//         <div>

//         <LoginForm />
//         </div>

//       </section>
//     </main>
//   );
// }
import styles from "./login-page.module.scss";

import Image from "next/image";

import { LoginForm } from "@/modules/auth/components/login-form/login-form";
import { LoginChart } from "@/modules/auth/components/login-chart/login-chart";

import logo from "../../../../public/images/ccp-logo.png"; // 👈 coloque sua imagem aqui

export default function LoginPage() {
  return (
    <main className={styles.container}>
      {/* =========================================
          LEFT SIDE
      ========================================= */}
      <section className={styles.left}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <div>
              {/* LOGO IMAGE */}
              <div className={styles.logoImageWrapper}>
                <Image
                  src={logo}
                  alt="CCP Logo"
                  width={76}
                  height={76}
                  priority
                />
                <span>Centro de Custos Pessoal</span>
              </div>
            </div>
          </div>

          <h2>
            Gestão <span>inteligente</span>
            <br />
            para resultados reais
          </h2>

          <p>
            O ECP centraliza, organiza e analisa seus custos para apoiar
            decisões estratégicas com segurança, eficiência e inteligência
            financeira.
          </p>

          <div className={styles.features}>
            <div>
              <strong>Visão completa</strong>
              <span>Acompanhe indicadores e métricas em tempo real.</span>
            </div>

            <div>
              <strong>Segurança total</strong>
              <span>Proteção e privacidade para seus dados financeiros.</span>
            </div>

            <div>
              <strong>Controle de acessos</strong>
              <span>Permissões inteligentes para cada perfil de usuário.</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          RIGHT SIDE
      ========================================= */}
      <section className={styles.right}>
        <div className={styles.loginContainer}>
          <div className={styles.loginChart}>
            <LoginChart />
          </div>

          <div className={styles.loginCard}>
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}

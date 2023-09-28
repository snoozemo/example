import { Footer } from "antd/es/layout/layout";

export default function AppFooter(): JSX.Element {
	return (
		<Footer className="absolute bottom-0 left-0 right-0  mx-auto text-center ">
			<a
				style={{ textShadow: "#000 0px 0px 2px" }}
				href="https://beian.miit.gov.cn/"
				className="text-xs text-white/[.6]"
			>
				豫ICP备2022029114号
			</a>
		</Footer>
	);
}

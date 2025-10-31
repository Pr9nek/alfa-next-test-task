import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  redirect("/products");
}

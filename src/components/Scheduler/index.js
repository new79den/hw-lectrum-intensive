import React, {Component} from "react"
import Styles from "./styles.scss"
import Checkbox from "../../theme/assets/Checkbox"
import Task from "../Task/index"
import propTypes from "prop-types"

class Scheduler extends Component {
    static propTypes = {}

    render() {
        return (
            <div className={Styles.scheduler}>
                <main>
                    <header>
                        <h1>Планировщик задач</h1>
                        <input type="text"/>
                    </header>
                    <section>
                        <form action="">
                            <input type="text"/>
                            <button>Добавить задачу</button>
                        </form>

                        <ul>
                            <Task/>
                            <Task/>
                            <Task/>
                        </ul>

                    </section>

                    <footer>

                            <Checkbox color1="#000" color2="#f5f5f5"/>
                            <span>Все задачи выполнены</span>

                    </footer>
                </main>

            </div>
        )
    }
}

export default Scheduler

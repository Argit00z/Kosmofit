<?php include('header.php'); ?>
            <!-- заголовок -->
            <article style="position: relative; top: 40px; left: 40px;">
                <div style="font-size: 50px;">
                    Абонементы        
                </div>   
            </article>
            <!-- карты -->
            <section style="text-align: center; "> 
                <div class = "anim module">   
                    <div>   
                        <button id="open-modal-btn1" style=" cursor: pointer; padding: 0;  border: none;   background: none;">    
                            <div class="cards" style="background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0,0.75)), url(./photo/card1.webp); background-position: center center;  background-size: 200% 100%; ">
                                Фитнес-зал       
                            </div>
                        </button>
                        <button id="open-modal-btn2" style="cursor: pointer; padding: 0;  border: none;   background: none;">    
                            <div class="cards" style="background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(./photo/card2.webp); background-position: center center;  background-size: 120% 100%;">
                                Сауна    
                            </div>
                        </button>
                        <button id="open-modal-btn1" style=" cursor: pointer; padding: 0;  border: none;   background: none;">    
                            <div class="cards" style="background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0,0.75)), url(./photo/card1.webp); background-position: center center;  background-size: 200% 100%; ">
                                Фитнес-зал       
                            </div>
                        </button>
                        <button id="open-modal-btn2" style="cursor: pointer; padding: 0;  border: none;   background: none;">    
                            <div class="cards" style="background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(./photo/card2.webp); background-position: center center;  background-size: 120% 100%;">
                                Сауна    
                            </div>
                        </button>
                    </div>
                </div>         
            </section>
            <!-- модалки -->
            <section>
                <div class = "modal" id = "my-modal1">
                    <div class = "modal-box">
                        <button class = "modal-close-btn" id = "close-my-modal-btn1">   
                            X
                        </button>     
                        <h2>Тренировки1</h2>
                    </div>
                </div>
                <div class = "modal" id = "my-modal2">
                    <div class = "modal-box">
                        <button class = "modal-close-btn" id = "close-my-modal-btn2">   
                            X
                        </button>     
                        <h2>Тренировки2</h2>
                    </div>
                </div>
            </section>
<?php include './footer.php'; ?>